import {describe,it,expect} from 'vitest';import i18n from './i18n';
describe('interface languages',()=>{it('provides core navigation in English and Bangla',()=>{for(const key of ['home','accounts','meals','bazar','signIn','submit','error']){expect(i18n.getResource('en','translation',key)).toBeTruthy();expect(i18n.getResource('bn','translation',key)).toBeTruthy()}})});
