const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: ["GET", "POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders:["Authorization"],
  credentials: true, // Allow cookies to be sent and received
};

export default corsOptions;