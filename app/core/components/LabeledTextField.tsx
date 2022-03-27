import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'

import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
    /** Field name. */
    name: string
    /** Field label. */
    label: string
    /** Field type. Doesn't include radio buttons and checkboxes */
    type?: 'text' | 'password' | 'email' | 'number'
    outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
    labelProps?: ComponentPropsWithoutRef<'label'>
    fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
    ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
        const {
            input,
            meta: { touched, error, submitError, submitting },
        } = useField(name, {
            parse:
                props.type === 'number'
                    ? (Number as any)
                    : // Converting `""` to `null` ensures empty values will be set to null in the DB
                      (v) => (v === '' ? null : v),
            ...fieldProps,
        })

        const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

        return (
            <FormControl {...outerProps}>
                <FormLabel {...labelProps}>
                    {label}
                    <Input {...input} disabled={submitting} {...props} ref={ref} />
                </FormLabel>
                {touched && normalizedError && (
                    <div role='alert' style={{ color: 'red' }}>
                        {normalizedError}
                    </div>
                )}
            </FormControl>
        )
    }
)

export default LabeledTextField
