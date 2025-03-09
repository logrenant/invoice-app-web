import type { Invoice } from '../types/invoice';
import { fetchInvoices, getInvoice } from '../api/invoices';

import dayjs from 'dayjs';
import { Table, Input, Tag, Button, Modal, Spin, Descriptions } from 'antd';
import { useState, useEffect, useCallback } from 'react';



const InvoiceListPage = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleTableChange = (newPagination: any) => {
        setPagination(prev => ({
            ...prev,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        }));
    };

    const handleShowDetails = async (id: number) => {
        setDetailLoading(true);
        try {
            const invoice = await getInvoice(id);
            setSelectedInvoice(invoice);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Detay yüklenemedi:', error);
        } finally {
            setDetailLoading(false);
        }
    };

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const { invoices, total_count } = await fetchInvoices(
                pagination.current,
                pagination.pageSize,
                searchText
            );

            setInvoices(invoices);
            setPagination(prev => ({
                ...prev,
                total: total_count
            }));
        } catch (error) {
            console.error('API Hatası:', error);
        } finally {
            setLoading(false);
        }
    }, [pagination.current, pagination.pageSize, searchText]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const columns = [
        {
            title: 'Service Name',
            dataIndex: 'ServiceName',
            key: 'ServiceName'
        },
        {
            title: 'Invoice Number',
            dataIndex: 'InvoiceNumber',
            key: 'InvoiceNumber',
        },
        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
            render: (date: string) => new Date(date).toLocaleDateString('tr-TR'),
            sorter: (a: Invoice, b: Invoice) => new Date(a.Date).getTime() - new Date(b.Date).getTime(),
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
            sorter: (a: Invoice, b: Invoice) => a.Amount - b.Amount,
            render: (amount: number) => `$${(amount || 0).toFixed(2)}`
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: (status: string) => (
                <Tag color={status === 'Paid' ? 'green' : status === 'Pending' ? 'gold' : 'red'}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Invoice) => (
                <Button
                    type="link"
                    onClick={() => handleShowDetails(record.ID)}
                >
                    Show
                </Button>
            )
        }
    ];

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', marginBottom: 20 }}>
                <Input.Search
                    placeholder="Faturalarda ara..."
                    onSearch={setSearchText}
                    style={{ width: 300 }}
                />
            </div>

            <Table
                columns={columns}
                dataSource={invoices}
                loading={loading}
                rowKey="ID"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showSizeChanger: false,
                }}
                onChange={handleTableChange}
            />

            <Modal
                title="Invoice Details"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                {detailLoading ? (
                    <Spin size="large" />
                ) : (
                    selectedInvoice && (
                        <Descriptions bordered column={2}>
                            <Descriptions.Item label="Service Name" span={2}>
                                {selectedInvoice.ServiceName}
                            </Descriptions.Item>
                            <Descriptions.Item label="Invoice Number">
                                {selectedInvoice.InvoiceNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Date">
                                {dayjs(selectedInvoice.Date).format('DD/MM/YYYY')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Amount">
                                ${selectedInvoice.Amount.toFixed(2)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={
                                    selectedInvoice.Status === 'Paid' ? 'green' :
                                        selectedInvoice.Status === 'Pending' ? 'gold' : 'red'
                                }>
                                    {selectedInvoice.Status}
                                </Tag>
                            </Descriptions.Item>
                        </Descriptions>
                    )
                )}
            </Modal>
        </div>
    );
};

export default InvoiceListPage;
