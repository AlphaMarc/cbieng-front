declare module "react-navigation-hooks" {
    import {
        NavigationScreenProp,
        NavigationRoute,
        NavigationParams,
        NavigationEventCallback,
        NavigationEventPayload,
        EventType,
      } from "react-navigation";

      interface FocusState {
        isFocused: boolean;
        isBlurring: boolean;
        isBlurred: boolean;
        isFocusing: boolean;
      }
      
      export function useNavigation<S>(): NavigationScreenProp<S & NavigationRoute>
      export function useNavigationParam<T extends keyof NavigationParams>(paramName: T): NavigationParams[T]
      export function useNavigationState<S>(): S
      export function useNavigationKey(): string
      export function useNavigationEvents(handleEvt: NavigationEventCallback): void
      export function useFocusState(): FocusState
}