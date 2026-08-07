export interface ConfirmModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  message: string
  showIcon?: boolean
}
