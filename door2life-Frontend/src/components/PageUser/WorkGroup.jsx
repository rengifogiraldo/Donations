
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const WorkGroup = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <Card className="max-w-md p-6 mx-auto my-8 text-black shadow-lg bg-green">
      <CardTitle className="mb-2 text-xl font-bold text-center sm:text-2xl">
        {t("workGroupTitle")} {/* Use translation key */}
      </CardTitle>

      <CardDescription className="mb-4 font-semibold text-center text-black">
        {t("workGroupDescription")} {/* Use translation key */}
      </CardDescription>

      <CardContent className="mb-4 font-semibold text-center">
        <p className="mb-4 font-semibold">{t("workGroupContent")}</p>
        <Link to={"/userpage/workgroup"}>
          <Button className="mt-5 text-xs text-black bg-greengrass hover:bg-grassGreen sm:text-sm">
            {t("viewWorkGroupButton")} {/* Use translation key */}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default WorkGroup;
