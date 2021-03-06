import * as React from 'react';
import * as hooks from '../hooks';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Routes } from './routes';

const mountWithRouter = (node, url = '/') =>
  mount(
    <MemoryRouter initialEntries={[url]} initialIndex={0}>
      {node}
    </MemoryRouter>,
  );

jest.mock('../hooks');

(hooks as any).useGlobalState = (select: any) =>
  select({
    app: {
      routes: {
        '/': StubComponent,
        '/custom': StubCustomPage,
      },
    },
    components: {
      pages: {
        '/foo': { component: StubFooPage },
        '/foo/bar': { component: StubFooBarPage },
        '/bar': { component: StubBarPage },
      },
    },
  });

const StubHome: React.SFC = props => <div />;
StubHome.displayName = 'StubHome';

const StubCustomPage: React.SFC = props => <div />;
StubCustomPage.displayName = 'StubCustomPage';

const StubNotFound: React.SFC = props => <div />;
StubNotFound.displayName = 'StubNotFound';

const StubComponent: React.SFC<{ data: any }> = props => <div />;
StubComponent.displayName = 'StubComponent';

const StubFooPage: React.SFC<{ data: any }> = props => <div />;
StubFooPage.displayName = 'StubFooPage';

const StubFooBarPage: React.SFC<{ data: any }> = props => <div />;
StubFooBarPage.displayName = 'StubFooBarPage';

const StubBarPage: React.SFC<{ data: any }> = props => <div />;
StubBarPage.displayName = 'StubBarPage';

describe('Routes Module', () => {
  it('always goes to the given home on "/"', () => {
    const node = mountWithRouter(<Routes Home={StubHome} NotFound={StubNotFound} />, '/');
    expect(node.find(StubHome).length).toBe(1);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
  });

  it('goes to the not found on an invalid path', () => {
    const node = mountWithRouter(<Routes Home={StubHome} NotFound={StubNotFound} />, '/qxz');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(1);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
  });

  it('goes to the custom page on "/custom"', () => {
    const node = mountWithRouter(<Routes Home={StubHome} NotFound={StubNotFound} />, '/custom');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(1);
    expect(node.find(StubFooBarPage).length).toBe(0);
  });

  it('goes exactly to the page on "/foo/bar"', () => {
    const node = mountWithRouter(<Routes Home={StubHome} NotFound={StubNotFound} />, '/foo/bar');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(1);
  });

  it('goes exactly to the page on "/foo"', () => {
    const node = mountWithRouter(<Routes Home={StubHome} NotFound={StubNotFound} />, '/foo');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
    expect(node.find(StubFooPage).length).toBe(1);
  });

  it('goes exactly to the page on "/bar"', () => {
    const node = mountWithRouter(<Routes Home={StubHome} NotFound={StubNotFound} />, '/bar');
    expect(node.find(StubHome).length).toBe(0);
    expect(node.find(StubNotFound).length).toBe(0);
    expect(node.find(StubCustomPage).length).toBe(0);
    expect(node.find(StubFooBarPage).length).toBe(0);
    expect(node.find(StubBarPage).length).toBe(1);
  });
});
