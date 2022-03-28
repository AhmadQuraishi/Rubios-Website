interface OrderBatch {



    batchId: number,
    // Unique order batch id. Each batch is associated with a collection of closed orders.

    generated: string
    // Date the order batch was generated, in "yyyymmdd hh:mm" format.

}
