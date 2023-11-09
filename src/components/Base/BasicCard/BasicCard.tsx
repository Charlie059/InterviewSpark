/* eslint-disable lines-around-comment */
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

/**
 * Properties for the BasicCard component.
 */
export interface BasicCardProps {
  /** The content to be displayed in the card. */
  children?: React.ReactNode

  /** The actions displayed at the bottom of the card. */
  actions?: React.ReactNode
}

export default function BasicCard(basicCardProps: BasicCardProps) {
  const { children, actions } = basicCardProps

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>{children}</CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  )
}
