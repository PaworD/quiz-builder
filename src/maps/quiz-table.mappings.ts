export const quizTableColumns = [
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Name',
    scopedSlots: { customRender: 'name' },
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Status',
    scopedSlots: { customRender: 'status' },
    width: 150
  },
  {
    title: 'Tag',
    key: 'tag',
    scopedSlots: { customRender: 'tag' },
    width: 100
  },
  {
    title: 'Options',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 80
  },
]