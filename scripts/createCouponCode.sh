#!/bin/bash

if [[ $# -lt 3 ]]; then
  echo "Usage: $0 <stripe_secret_key> <percent_off> <name>"
  exit 1
fi

SK=$1
PERCENT_OFF=$2
NAME=$3

# Create the coupon and extract its ID
COUPON_ID=$(curl -s https://api.stripe.com/v1/coupons \
  -u $SK: \
  -d percent_off="$PERCENT_OFF" \
  -d duration=repeating \
  -d duration_in_months=12 \
  -d name="$NAME" | jq -r '.id')

if [[ -z "$COUPON_ID" ]]; then
  echo "Failed to create coupon or retrieve its ID."
  exit 1
fi

# Create CSV file and write headers
CSV_FILE="promotion_codes.csv"
echo "id,code,coupon_id,coupon_name,coupon_percent_off" > $CSV_FILE

# Create the promotion codes, extract data, and write to CSV
for i in {1..1000}
do
  curl -s https://api.stripe.com/v1/promotion_codes \
    -u $SK: \
    -d coupon="$COUPON_ID" \
    -d max_redemptions=1 |
    jq -r '[.id, .code, .coupon.id, .coupon.name, .coupon.percent_off] | @csv' >> $CSV_FILE
done
