declare module '@vuepic/vue-datepicker' {
  import { DefineComponent } from 'vue'
  
  interface DatePickerProps {
    modelValue: Date | null
    modelType?: DateConstructor
    enableTimePicker?: boolean
    textInput?: boolean
    autoApply?: boolean
    teleport?: boolean
    closeOnAutoApply?: boolean
    textInputFormat?: string
    format?: (date: Date | null) => string
    name?: string
    placeholder?: string
    minDate?: Date
    inputClassName?: string
    value?: Date | null
  }

  interface DatePickerEvents {
    'update:modelValue': [value: Date | null]
    closed: []
    opened: []
  }

  const VueDatePicker: DefineComponent<DatePickerProps, {}, {}, {}, {}, {}, {}, DatePickerEvents>
  export default VueDatePicker
} 