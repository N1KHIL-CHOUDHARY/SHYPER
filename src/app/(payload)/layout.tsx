/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/utilities'
import type { ServerFunctionClient } from 'payload'
import React from 'react'
import { importMap } from './admin/[[...segments]]/importMap'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions(args)
}

const Layout = ({ children }: Args) => (
  <RootLayout importMap={importMap} config={config} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
