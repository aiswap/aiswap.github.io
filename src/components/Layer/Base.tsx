import React from 'react'

import { Layout } from 'antd';
import LayerSide from './Sider'

export default function LayerBase({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LayerSide>
      </LayerSide>
        {children}
    </Layout>
  )
}

