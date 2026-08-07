import { Calendar, MapPin, Phone, CreditCard } from 'lucide-react'
import Modal from '@/shared/components/Modal'
import type { OrderDetailsProps } from '@/types/order'
import OrderHero from './OrderHero'
import OrderInfoRow from './OrderInfoRow'
import OrderProductsSection from './OrderProductsSection'
import styles from '../styles/OrderDetails.module.css'

export default function OrderDetails({ order, onClose, onStatusChange }: OrderDetailsProps) {
  return (
    <Modal open={!!order} onClose={onClose} title="Sifariş məlumatları" wide className={styles.wideModal}>
      {order && (
        <div>
          <OrderHero order={order} onStatusChange={onStatusChange} />

          <div className={styles.detailList}>
            <OrderInfoRow icon={MapPin} color="amber" label="Çatdırılma Ünvanı" value={order.address} />
            <div className={styles.infoGrid}>
              <OrderInfoRow icon={Calendar} color="blue" label="Tarix" value={order.date} />
              <OrderInfoRow icon={Phone} color="purple" label="Telefon" value={order.phone} />
              <OrderInfoRow icon={CreditCard} color="green" label="Ödəmə Metodu" value={order.paymentMethod} />
            </div>
          </div>

          <OrderProductsSection items={order.items} freeShipping={order.freeShipping} />
        </div>
      )}
    </Modal>
  )
}
