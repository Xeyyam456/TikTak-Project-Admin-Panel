export interface FormDropdownOption {
  value: string
  label: string
}

export interface FormDropdownProps {
  value: string
  onChange: (value: string) => void
  options: FormDropdownOption[]
  placeholder?: string
}
