import React from 'react'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'

const steps = [50, 200, 500, 1000, 2000]
const stepLabels = ['50', '200', '500', '1000', '>2000']

export default function StepBar({ amount }) {
  if (!amount) {
    amount = 0
  }
  // Berechnet den aktuellen Schritt basierend auf dem Verkaufsbetrag
  const currentStep = steps.findIndex((step) => amount < step)
  const stepIndex = currentStep === -1 ? steps.length - 1 : currentStep

  return (
    <Box
      sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 2, marginTop: '20px' }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontFamily: 'cormorant-garamond',
          // fontWeight: 'bold',
          fontSize: '2rem',
          marginBottom: '50px',
        }}
      >
        {/* Spenden-Schrittleiste: {steps[stepIndex]}€ */}
        Donation step bar
      </Typography>
      <Stepper activeStep={stepIndex} alternativeLabel sx={{ scale: '1.2' }}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: index <= stepIndex ? 'black' : 'gray' }}>
              {stepLabels[index]}€
              {index === stepIndex && Number.isFinite(amount) && (
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '14px',
                    color: '#1976d2',
                    fontWeight: 'bold',
                  }}
                >
                  {amount}€
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
