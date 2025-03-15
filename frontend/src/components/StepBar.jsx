import React from 'react'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'

const steps = [50, 200, 500, 1000, 2000]
const stepLabels = ['50', '200', '500', '1000', '>2000']

export default function StepBar({ amount }) {
  // Berechnet den aktuellen Schritt basierend auf dem Verkaufsbetrag
  const currentStep = steps.findIndex((step) => amount < step)
  const stepIndex = currentStep === -1 ? steps.length - 1 : currentStep

  return (
    <Box
      sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 2, marginTop: '30px' }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontFamily: 'cormorant-garamond',
          //   fontWeight: 'bold',
          fontSize: '1.8rem',
        }}
      >
        {/* Spenden-Schrittleiste: {steps[stepIndex]}€ */}
        Spenden-Schrittleiste
      </Typography>
      <Stepper activeStep={stepIndex} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{stepLabels[index]}€</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
