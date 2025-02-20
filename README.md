# NextAuth and getServerSideProps in Next.js 15's App Directory

This repository demonstrates a common issue encountered when using NextAuth's `unstable_getServerSession` with Next.js 15's `app` directory and the `getServerSideProps` function.  The traditional approach of using `getServerSideProps` for authentication breaks in the new architecture.

## Problem

The `getServerSideProps` function, commonly used for server-side rendering and authentication, doesn't function correctly within the `app` directory in Next.js 15 when combined with NextAuth. This results in authentication failures or unexpected redirects.

## Solution

The solution involves migrating to `middleware` or using `next/auth/middleware` instead of relying on `getServerSideProps`.  This leverages the new routing system of the `app` directory.