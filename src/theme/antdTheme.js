/* Ant Design Theme Configuration */
export const antdTheme = {
  token: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    colorPrimary: '#5433eb',
    colorPrimaryHover: '#4526d3',
    colorPrimaryActive: '#381bb5',
    colorBgBase: '#ffffff',
    colorBgLayout: '#f2f4f5',
    colorBgContainer: '#ffffff',
    colorText: '#1a1a1a',
    colorTextSecondary: '#6b7280',
    colorBorder: '#ebebeb',
    colorBorderSecondary: '#ebebeb',
    colorError: '#ba1a1a',
    borderRadius: 8,
    borderRadiusLG: 28,
    borderRadiusSM: 9999,
  },
  components: {
    Button: {
      borderRadius: 9999,
      controlHeight: 44,
      primaryShadow: '0px 4px 24px 0px rgba(69, 36, 219, 0.34)',
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 28,
      colorBorderSecondary: '#ebebeb',
      boxShadowTertiary: '0px 4px 6px -1px rgba(0, 0, 0, 0.06), 0px 2px 4px -2px rgba(0, 0, 0, 0.04)',
    },
    Input: {
      borderRadius: 9999,
      controlHeight: 44,
      colorBorder: '#ebebeb',
      activeBorderColor: '#5433eb',
      hoverBorderColor: '#5433eb',
    },
    Select: {
      borderRadius: 9999,
      controlHeight: 44,
      colorBorder: '#ebebeb',
    },
    Tag: {
      borderRadiusSM: 9999,
    },
    Checkbox: {
      borderRadiusSM: 8,
      colorPrimary: '#1a1a1a',
    },
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f2f4f5',
    },
  },
};
