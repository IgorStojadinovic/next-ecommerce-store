const OrdersContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <section className="flex flex-col gap-8 items-start w-full h-full p-10 pt-46">
            <h1 className="text-2xl font-bold">Orders</h1>
            {children}
       </section>
    );
};

export default OrdersContainer;