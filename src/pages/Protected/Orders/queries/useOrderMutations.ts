import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateOrderStatus } from '@/services/orderService'
import type { Order } from '@/types/order'
import type { OrderStatus } from '@/lib/constants/orderStatus'

export function useOrderMutations() {
  const queryClient = useQueryClient()

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) => updateOrderStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] })
      const previousOrders = queryClient.getQueryData<Order[]>(['orders'])
      queryClient.setQueryData<Order[]>(['orders'], (old) =>
        old?.map((o) => (o.id === id ? { ...o, status } : o)),
      )
      return { previousOrders }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders)
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
        queryClient.invalidateQueries({ queryKey: ['orderStats'] }),
      ])
      toast.success('Sifariş statusu yeniləndi')
    },
  })

  return {
    updateStatus: (id: number, status: OrderStatus) => statusMutation.mutate({ id, status }),
  }
}
