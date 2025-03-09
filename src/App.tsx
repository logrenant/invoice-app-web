// App.tsx
import Sidebar from './components/Sidebar';
import InvoiceListPage from './pages/InvoiceListPage';

import { Layout, ConfigProvider } from 'antd';
import { Routes, Route } from 'react-router-dom';

const { Content } = Layout;

function App() {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
      />
      <Layout style={{
        marginLeft: 250,
        transition: 'margin 0.2s'
      }}>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
            borderRadius: 8,
          }}
        >
          <Routes>
            <Route path="/invoices" element={<InvoiceListPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;