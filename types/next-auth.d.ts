import type { DefaultSession } from 'next-auth'

/**
 * NextAuth.js 类型扩展文件
 * 用于扩展 NextAuth 的默认类型定义，添加自定义字段
 */

declare module 'next-auth' {
  /**
   * 扩展 Session 接口
   * 在用户会话中添加 id 字段，方便在应用中获取用户唯一标识
   */
  interface Session {
    user: {
      id: string // 用户唯一标识
    } & DefaultSession['user'] // 保留原有属性（name, email, image等）
  }
}

declare module 'next-auth/jwt' {
  /**
   * 扩展 JWT 接口
   * 在 JWT token 中添加 id 字段，用于存储用户ID
   */
  interface JWT {
    id?: string // 可选的用户ID字段
  }
}