const AppLogo = ({ isLoadingScreen }) => {
  return (
    <p
      translate="no"
      className={`${
        isLoadingScreen ? "text-5xl" : "text-3xl"
      } font-bold gradient-text`}
    >
      StaffTracker
    </p>
  );
};

export default AppLogo;
