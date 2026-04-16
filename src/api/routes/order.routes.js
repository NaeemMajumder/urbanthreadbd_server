/**
 * routes/order.routes.js

    Order related সব URL — সব protected route (login ছাড়া order করা যাবে না)

    router.post('/', authenticate, orderController.create);
    router.get('/my-orders', authenticate, orderController.getUserOrders);
 */