# folder basic structure

urbanthread-bd/
├── server.js                        ← Entry point, শুধু listen()
├── .env                             ← Secret keys (git এ দিও না)
├── .env.example                     ← Template (git এ দাও)
├── .gitignore
├── package.json
│
└── src/
    ├── app.js                       ← Express setup, middleware, routes mount
    │
    ├── config/
    │   ├── db.js                    ← MongoDB connection
    │   └── index.js                 ← সব env variable এক জায়গায়
    │
    ├── api/
    │   ├── routes/
    │   │   ├── index.js             ← Root router (/api/v1)
    │   │   ├── auth.routes.js
    │   │   ├── product.routes.js
    │   │   ├── order.routes.js
    │   │   └── user.routes.js
    │   │
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   ├── product.controller.js
    │   │   ├── order.controller.js
    │   │   └── user.controller.js
    │   │
    │   └── middlewares/
    │       ├── errorHandler.js      ← Global error handler
    │       ├── authenticate.js      ← JWT verify
    │       └── validate.js          ← Request validation
    │
    ├── models/
    │   ├── User.model.js
    │   ├── Product.model.js
    │   └── Order.model.js
    │
    ├── services/
    │   ├── auth.service.js          ← Business logic
    │   ├── product.service.js
    │   └── order.service.js
    │
    └── utils/
        ├── AppError.js              ← Custom error class
        └── asyncHandler.js         ← try/catch wrapper




Data Flow মনে রাখো
  → routes        (কোথায় যাবে)
  → middlewares   (authenticate, validate)
  → controllers   (req/res handle)
  → services      (business logic)
  → models        (database)
  → Response


এখন কোনটা দিয়ে শুরু করবে? আমি suggest করবো এই order এ:

utils/ → 2. config/ → 3. models/ → 4. auth → 5. products → 6. orders