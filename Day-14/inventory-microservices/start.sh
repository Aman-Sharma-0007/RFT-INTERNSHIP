#!/bin/bash
echo ""
echo "🚀 Starting Inventory Microservices..."
echo ""

node product-service/product.index.js &
node inventory-service/inventory.index.js &
node sort-service/sort.index.js &
node gateway/gateway.index.js &

wait