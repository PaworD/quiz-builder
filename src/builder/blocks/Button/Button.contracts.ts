import { Element } from '@/builder'
import { PossibleElements } from '@/builder/defaults'

export type ButtonActionType = string | (() => void)

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export interface ButtonProps {
  /**
   * Determines button action.
   */
  action: ButtonActionType

  /**
   * Determines whether the component is disabled.
   */
  disabled: boolean

  /**
   * Determines whether the component should display indicator.
   */
  isLoading: boolean

  /**
   * Button's label.
   */
  label: string

  /**
   * Button's shape
   */
  shape: string

  /**
   * Button's theme
   */
  theme: string

  /**
   * Button's variant
   */
  variant: string
}

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export type ButtonElement = Element<ButtonProps, PossibleElements.Button>

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export enum ButtonAction {
  Link = 'link',
  Click = 'click'
}

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export enum ButtonTheme {
  Primary = 'primary',
  Secondary = 'secondary'
}

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export const buttonThemeClassRegistry: Record<ButtonTheme, string> = {
  [ButtonTheme.Secondary]: '--secondary',
  [ButtonTheme.Primary]: ''
}

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export enum ButtonShape {
  Rectangle = 'rectangle',
  Square = 'square'
}

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export const ButtonShapeClassRegistry: Record<ButtonShape, string> = {
  [ButtonShape.Rectangle]: '',
  [ButtonShape.Square]: '--square'
}

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl> (edited)
 */
export enum ButtonVariant {
  Full = 'full',
  Outline = 'outline',
}

/**
 * @author Maciej Perzankowski <maciej.perzankowski@movecloser.pl>
 */
export const ButtonVariantClassRegistry: Record<ButtonVariant, string> = {
  [ButtonVariant.Full]: '',
  [ButtonVariant.Outline]: '--outline'
}

