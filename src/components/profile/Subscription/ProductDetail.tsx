import { Box, Card, CardContent, LinearProgress, Typography } from '@mui/material'
import { use, useEffect, useState } from 'react'
import { ProductTotalNumUsage, UserSubscriptionProduct } from 'src/context/types'

interface ProductDetailInterface {
  product: UserSubscriptionProduct
}

export const ProductDetail = (productDetailInterface: ProductDetailInterface) => {
  // ** Destructure the props
  const { product } = productDetailInterface

  // ** Constants
  const linearGradient = 'linear-gradient(45deg, blue, purple)' // ** Premium Linear Progression

  const [productUsagePercent, setProductUsagePercent] = useState<number>(
    (product.productNumUsage / product.productTotalNumUsage) * 100
  )

  useEffect(() => {
    setProductUsagePercent((product.productNumUsage / product.productTotalNumUsage) * 100)
  }, [product])

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 2 }}>
          {product.productName}
        </Typography>
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{product.productDetail}</Typography>
        <Box sx={{ display: 'flex', mb: 2, justifyContent: 'flex-end' }}>
          {product.productTotalNumUsage === ProductTotalNumUsage.Free && (
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
              Product Usage: {product.productNumUsage} / {product.productTotalNumUsage}
            </Typography>
          )}
        </Box>
        {product.productTotalNumUsage === ProductTotalNumUsage.Free ? (
          <LinearProgress value={productUsagePercent} variant='determinate' sx={{ height: 10, borderRadius: '5px' }} />
        ) : (
          <Box>
            <LinearProgress
              variant='indeterminate'
              sx={{ mt: 5, height: 10, borderRadius: '5px', backgroundImage: linearGradient }}
            />
            <Typography
              sx={{
                mt: 5,
                fontWeight: 500,
                fontSize: '0.875rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              Unlimited access at your disposal
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
