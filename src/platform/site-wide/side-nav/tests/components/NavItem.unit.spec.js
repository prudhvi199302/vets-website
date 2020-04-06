// Dependencies
import React from 'react';
import { shallow } from 'enzyme';
import { uniqueId } from 'lodash';
// Relative
import NavItem from '../../components/NavItem';

describe('<NavItem>', () => {
  test('should always render when used.', () => {
    const wrapper = shallow(<NavItem />);
    expect(wrapper.type()).not.toBeNull();
    wrapper.unmount();
  });

  test('should render child nav items when it has children and it is expanded.', () => {
    const noop = () => {};

    const item = {
      description: 'Some description',
      expanded: true,
      hasChildren: true,
      href: '/pittsburgh-health-care',
      id: uniqueId('sidenav_'),
      isSelected: true,
      label: 'Location',
      order: 0,
      parentID: uniqueId('sidenav_'),
    };

    const defaultProps = {
      depth: 2,
      item,
      index: 1,
      renderChildItems: noop,
      sortedNavItems: [item],
      toggleItemExpanded: noop,
    };

    const wrapper = shallow(<NavItem {...defaultProps} />);
    expect(wrapper.contains(<ul />)).toBe(true);
    wrapper.unmount();
  });

  test('should render the ending line when nav item is first level and not the last nav item.', () => {
    const noop = () => {};

    const item = {
      description: 'Some description',
      expanded: true,
      hasChildren: true,
      href: '/pittsburgh-health-care',
      id: uniqueId('sidenav_'),
      isSelected: true,
      label: 'Location',
      order: 0,
      parentID: uniqueId('sidenav_'),
    };

    const lastItem = {
      description: 'Some description',
      expanded: true,
      hasChildren: true,
      href: '/pittsburgh-health-care',
      id: uniqueId('sidenav_'),
      isSelected: true,
      label: 'Location',
      order: 1,
      parentID: uniqueId('sidenav_'),
    };

    const defaultProps = {
      depth: 1,
      item,
      index: 0,
      renderChildItems: noop,
      sortedNavItems: [item, lastItem],
      toggleItemExpanded: noop,
    };

    const wrapper = shallow(<NavItem {...defaultProps} />);
    expect(wrapper.contains(<div className="line" />)).toBe(true);
    wrapper.unmount();
  });
});
