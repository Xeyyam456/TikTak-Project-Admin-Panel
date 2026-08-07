import { ShoppingCart, DollarSign, Clock, Timer, CheckCircle2, XCircle } from 'lucide-react'
import type { OrderStatCardConfig } from '@/types/order'

export const ORDER_STAT_CARDS: OrderStatCardConfig[] = [
  { key: 'TOTAL', label: 'Ümumi sifarişlər', icon: ShoppingCart, color: '#3b82f6' },
  { key: 'TOTAL_REVENUE', label: 'Ümumi satış', icon: DollarSign, color: '#22c55e' },
  { key: 'PENDING', label: 'Gözləyən', icon: Clock, color: '#f59e0b' },
  { key: 'PREPARING', label: 'Hazırlanır', icon: Timer, color: '#a855f7' },
  { key: 'DELIVERED', label: 'Çatdırılan', icon: CheckCircle2, color: '#22c55e' },
  { key: 'CANCELLED', label: 'Ləğv edilən', icon: XCircle, color: '#ef4444' },
]
