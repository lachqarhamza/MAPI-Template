import express from 'express'
import controller from '../controllers'
import { makeCallback } from '../../../helpers'

let router = express.Router()

/**
 * @implemented false
 * @tested      false
 * @route       POST auth/register
 * @desc        Register user
 * @roles       client
 */

router.post('/register', makeCallback(controller.controller1))

export default router
