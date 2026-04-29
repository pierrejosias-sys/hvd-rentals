'use client'
import { useState } from 'react'
const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@email.com', product: 'VIBIN Foundation Tee', size: 'M', color: 'Black', quantity: 1, total: 45, status: 'pending', date: '2026-04-29', address: { street: '123 Main St', city: 'Jacksonville', state: 'FL', zip: '32Z56' } },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@email.com', product: 'Move Different Tee', size: 'L', color: 'Black', quantity: 2, total: 90, status: 'paid', date: '2026-04-28', address: { street: '456 Oak Ave', city: 'Miami', state: 'FL', zip: '33Z01' } },
  { id: 'ORD-003', customer: 'Mike Johnson', email: 'mike@email.com', product: 'VOL 01 Hoodie', size: 'XL', color: 'Black', quantity: 1, total: 75, status: 'shipped', date: '2026-04-27', tracking: '1Z999AA10Z23Z56Z78Z', address: { street: '789 Pine Rd', city: 'Tampa', state: 'FL', zip: '33Z601' } },
]
export default function AdminOrdersPage() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const orders = mockOrders.filter(o => (filter === 'all' || o.status === filter) && (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())))
  const statusBadge = s => ({ pending: 'bg-amber-500/20 text-amber-400', paid: 'bg-blue-500/20 text-blue-400', shipped: 'bg-emerald-500/20 text-emerald-400' })[s] || 'bg-gray-500/20 text-gray-400'
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6 tracking-widest">ORDERS</h1>
      <div className="flex gap-2 mb-6">
        <input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="bg-white/5 border border-white/10 px-4 py-2 flex-1 max-w-64"/>
        {['all','pending','paid','shipped'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 ${filter===f?'bg-white text-black':'bg-white/10'}`}>{f.toUpperCase()}</button>)}
      </div>
      <div className="grid gap-4">
        {orders.map(o => (
          <div key={o.id} className="bg-white/5 border border-white/10 p-5 hover:border-white/20">
            <div className="flex justify-between mb-4">
              <span className="font-bold">{o.id}</span>
              <span className={`px-2 text-xs ${statusBadge(o.status)}`}>{o.status.toUpperCase()}</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div><div className="text-gray-500 mb-1">CUSTOMER</div><div className="font-medium">{o.customer}</div><div className="text-gray-400">{o.email}</div></div>
              <div><div className="text-gray-500 mb-1">PRODUCT</div><div className="font-medium">{o.product}</div><div className="text-gray-400">{o.size}/{o.color}/Qty{o.quantity}</div></div>
              <div><div className="text-gray-500 mb-1">TOTAL</div><div className="text-xl font-bold">${o.total}</div></div>
            </div>
            <button onClick={() => setSelected(o)} className="px-4 py-2 bg-white text-black text-sm">VIEW DETAILS</button>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-black border border-white/20 p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">ORDER {selected.id}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Customer</span><span>{selected.customer}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span>{selected.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Product</span><span>{selected.product}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Size / Color</span><span>{selected.size} / {selected.color}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-3"><span className="text-gray-500">Total</span><span className="text-xl font-bold">${selected.total}</span></div>
              <div className="border-t border-white/10 pt-3"><span className="text-gray-500">Ship To</span><div>{selected.address.street}</div><div>{selected.address.city}, {selected.address.state} {selected.address.zip}</div></div>
              {selected.tracking && <div className="flex justify-between"><span className="text-gray-500">Tracking</span><span className="font-mono">{selected.tracking}</span></div>}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSelected(null)} className="flex-1 py-3 bg-white/10">CLOSE</button>
              <button className="flex-1 py-3 bg-white text-black">BUY LABEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
