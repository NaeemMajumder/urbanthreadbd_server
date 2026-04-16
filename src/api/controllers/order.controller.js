/**
 * controllers/order.controller.js

    Request থেকে cart/order data নেয়, service কে দেয়, order confirm পাঠায়

    const order = await orderService.create(req.user.id, req.body);
    res.json({ order });
 * 
 */