import React from 'react';
import { useDeviceDetail } from '../useDeviceDetail';
import { useDeviceUpdate } from '../useDeviceUpdate';
import { useCreateDevice } from '../useCreateDevice';

interface validationRulesInterface {
  [key: string]: {
    validate: Array<(value: string) => string | boolean>;
  };
}

export interface FormErrors {
  system_name: string;
  type: string;
  hdd_capacity: string;
}

export const initialFormState = {
  system_name: '',
  type: '',
  hdd_capacity: '',
};

const validationRules: validationRulesInterface = {
  'system_name': {
    validate: [(value: string) => value.length > 0 || 'System name is required.'],
  },
  'type': {
    validate: [(value: string) => value.length > 0 || 'Type is required.'],
  },
  'hdd_capacity': {
    validate: [(value: string) => value.length > 0 || 'HDD capacity is required.'],
  },
};

const validateField = (fieldName: string, fieldValue: string) => {
  const rules = validationRules[fieldName];
  if (rules) {
    const errors = rules.validate
      .map((validateFn) => validateFn(fieldValue))
      .filter((result: string | boolean) => result !== true);

    return errors.join(', ');
  }
  return '';
};

const validateForm = (formState: typeof initialFormState): FormErrors => {
  const newErrors: FormErrors = {
    system_name: '',
    type: '',
    hdd_capacity: '',
  };

  Object.keys(formState).forEach((formFieldKey) => {
    const currentFormFieldValue = formState[formFieldKey as keyof typeof formState];
    const error = validateField(formFieldKey, currentFormFieldValue);
    if (error) {
      newErrors[formFieldKey as keyof typeof newErrors] = error;
    }
  });

  return newErrors;
};

export const useDeviceForm = (deviceId?: string | null) => {
  const { data: deviceDetail } = useDeviceDetail(deviceId ? deviceId : '', {
    enabled: !!deviceId,
  });

  const { mutateAsync: updateDevice } = useDeviceUpdate();
  const { mutateAsync: createDevice } = useCreateDevice();

  const [formState, setFormState] = React.useState(initialFormState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (selectedValues: any) => {
    const value = !Array.isArray(selectedValues) ? selectedValues.value : '';
    setFormState((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const clearForm = () => {
    setFormState(initialFormState);
  }

  const mutate = async () => {
    if (deviceId) {
      return await updateDevice({ id: deviceId, ...formState });
    } else {
      return await createDevice(formState);
    }
  }

  const handleSubmit = async () => {
    const errors = validateForm(formState);

    const hasErrors = Object.values(errors).some(error => error.length > 0);

    if (hasErrors) {
      return { status: 'formInvalid', errors };
    }

    try {
      await mutate();
      return { status: 'success' };
    } catch (error: any) {
      return { status: 'error', message: error.message };
    }
  };

  React.useEffect(() => {
    if (deviceDetail) {
      setFormState({
        system_name: deviceDetail.system_name,
        type: deviceDetail.type,
        hdd_capacity: String(deviceDetail.hdd_capacity),
      });
    }
  }, [deviceDetail]);

  return {
    formState,
    clearForm,
    handleChange,
    handleDropdownChange,
    handleSubmit,
  };
};
