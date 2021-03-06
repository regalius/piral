import * as React from 'react';
import { ArbiterModule } from 'react-arbiter';
import { PortalApi, ExtensionComponentProps, Dict, TileRegistration } from 'piral-core';

/**
 * Shows the possibility of extending default functionality (e.g., the dashboard)
 * with an extension defined by a module.
 */
export const DashboardModule: ArbiterModule<PortalApi<{}>> = {
  content: '',
  dependencies: {},
  name: 'Dashboard Module',
  version: '1.0.0',
  hash: '3',
  setup(portal) {
    const CustomDashboard: React.SFC<ExtensionComponentProps<PortalApi<{}>, { tiles: Dict<TileRegistration> }>> = ({
      params: { tiles },
    }) => {
      return (
        <div className="tiles">
          {Object.keys(tiles).map(tile => {
            const Component = tiles[tile].component;
            return <Component key={tile} columns={1} rows={1} />;
          })}
        </div>
      );
    };
    CustomDashboard.displayName = 'CustomDashboard';

    portal.registerExtension('dashboard', CustomDashboard);
  },
};
