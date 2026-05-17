export const rolePermissions = {

    admin: [
      "/dashboard",
      "/dashboard/consumers",
      "/dashboard/meters",
      "/dashboard/meter-mappings",
      "/dashboard/meter-readings",
      "/dashboard/bills",
      "/dashboard/payments",
      "/dashboard/analytics",
    ],
  
    manager: [
      "/dashboard",
      "/dashboard/consumers",
      "/dashboard/meters",
      "/dashboard/meter-mappings",
      "/dashboard/bills",
      "/dashboard/analytics",
    ],
  
    cashier: [
      "/dashboard",
      "/dashboard/payments",
    ],
  
    reader: [
      "/dashboard",
      "/dashboard/meter-readings",
    ],
  
    consumer: [
      "/dashboard",
      "/dashboard/my-meter",
      "/dashboard/my-readings",
      "/dashboard/my-bills",
      "/dashboard/my-payments",
    ],
  };