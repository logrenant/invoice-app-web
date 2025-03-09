// components/Sidebar.tsx
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import {
    HomeOutlined,
    FileTextOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const sidebarStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    background: '#fff',
};

const menuStyle: React.CSSProperties = {
    background: 'transparent',
    borderRight: 0,
    padding: '16px 8px',
};

const menuItemStyle: React.CSSProperties = {
    borderRadius: '8px',
    margin: '4px 8px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
};

const activeMenuItemStyle: React.CSSProperties = {
    borderRight: '4px solid #208ef5',
    background: 'rgba(29, 143, 242, 0.1)',
};

const Sidebar = () => {
    const location = useLocation();

    const items: MenuProps['items'] = [
        {
            key: '/',
            icon: <HomeOutlined style={{ fontSize: '18px', color: '#5b8df1' }} />,
            label: (
                <Link to="/" style={{ color: '#000000', fontWeight: 500 }}>
                    Home
                </Link>
            ),
            style: {
                ...menuItemStyle,
                ...(location.pathname === '/' && activeMenuItemStyle),
            }
        },
        {
            key: '/invoices',
            icon: <FileTextOutlined style={{ fontSize: '18px', color: '#5b8df1' }} />,
            label: (
                <Link to="/invoices" style={{ color: '#000000', fontWeight: 500 }}>
                    Invoices
                </Link>
            ),
            style: {
                ...menuItemStyle,
                ...(location.pathname === '/invoices' && activeMenuItemStyle),
            },
        },
        {
            key: '/settings',
            icon: <SettingOutlined style={{ fontSize: '18px', color: '#5b8df1' }} />,
            label: (
                <Link to="/settings" style={{ color: '#000000', fontWeight: 500 }}>
                    Settings
                </Link>
            ),
            style: {
                ...menuItemStyle,
                ...(location.pathname === '/settings' && activeMenuItemStyle),
            }
        },
    ];

    return (
        <Sider
            width={260}
            style={sidebarStyle}
            theme="dark"
            breakpoint="lg"
            collapsedWidth="80"
        >
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={items}
                style={menuStyle}
                theme="dark"
            />
        </Sider>
    );
};

export default Sidebar;