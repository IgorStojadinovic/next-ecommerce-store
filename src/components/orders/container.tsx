const OrdersContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="rounded-lg bg-white p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[1px] text-(--color-orange-primary)">
                Orders
            </p>
            {children}
        </section>
    );
};

export default OrdersContainer;
