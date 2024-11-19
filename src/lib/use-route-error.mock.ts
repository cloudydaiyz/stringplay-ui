import { fn } from '@storybook/test';
import * as actual from "./use-route-error";

export const useRouteError = fn(actual.useRouteError).mockName('useRouteError');
export const hi = fn(actual.hi).mockName('hi');