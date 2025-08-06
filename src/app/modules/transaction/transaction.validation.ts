import z from 'zod'

// Add Money payload zod schema
export const addMoneyZodSchema = z.object({
    balance: z.number('Balance must be a positive number')
    .int('Amount should be integer number')
    .positive('Amount should be positive Number')
    .min(10, 'Minimum add balance amount is 10')
    .max(50000, 'Maximum add balance amount is 50,000 at a time')
})

// Withdraw Money payload zod schema
export const withDrawMoneyZodSchema = z.object({
    balance: z.number('Balance must be a positive number')
    .int('Amount should be integer number')
    .positive('Amount should be positive Number')
    .min(10, 'Minimum add balance amount is 10')
    .max(50000, 'Maximum add balance amount is 50,000 at a time')
})

// Send Money payload zod schema
export const sendMoneyZodSchema = z.object({
    numberTo: z.string('Number must be a string')
    .length(11)
    .regex(/^01[3-9]\d{8}$/),
    amount: z.number('Balance must be a positive number')
    .int('Amount should be integer number')
    .positive('Amount should be positive Number')
    .min(10, 'Minimum add balance amount is 10')
    .max(50000, 'Maximum add balance amount is 50,000 at a time')
})

// Cash in payload zod schema
export const cashInZodSchema = z.object({
    phone: z.string('Number must be a string')
    .length(11)
    .regex(/^01[3-9]\d{8}$/),
    amount: z.number('Balance must be a positive number')
    .int('Amount should be integer number')
    .positive('Amount should be positive Number')
    .min(10, 'Minimum add balance amount is 10')
    .max(50000, 'Maximum add balance amount is 50,000 at a time')
})


// Cash out payload zod schema
export const cashOutZodSchema = z.object({
    agentPhoneNumber: z.string('Number must be a string')
    .length(11)
    .regex(/^01[3-9]\d{8}$/),
    cashOutAmount: z.number('Balance must be a positive number')
    .int('Amount should be integer number')
    .positive('Amount should be positive Number')
    .min(10, 'Minimum add balance amount is 10')
    .max(50000, 'Maximum add balance amount is 50,000 at a time')
})


// Transaction parameter payload cration zod schema
export const transactionParameterCreationZodSchema = z.object({
    sendMoneyCharge: z.number('Value must be a positive number.').positive(),
    agentCommision: z.number('Value must be a positive number.').positive(),
    cashOutCharge: z.number('Value must be a positive number.').positive(),
})


// Transaction parameter payload update zod schema
export const transactionParameterUpdateZodSchema = z.object({
    sendMoneyCharge: z.number('Value must be a positive number.').positive().optional(),
    agentCommision: z.number('Value must be a positive number.').positive().optional(),
    cashOutCharge: z.number('Value must be a positive number.').positive().optional(),
})