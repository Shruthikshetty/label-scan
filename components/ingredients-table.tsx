import { Box } from "@/components/ui/box";
import { Table, TableBody, TableData, TableRow } from "@/components/ui/table";
import { Heading } from "@/components/ui/heading";

export type Per100g = {
  name: string;
  analyzed: number;
  unit: string;
};

const IngredientsTable = ({
  title = "",
  data = [],
}: {
  title?: string;
  data: Per100g[];
}) => {
  return (
    <Box className="gap-3">
      <Heading size="lg" className="color-typography-950" bold>
        {title}
      </Heading>
      {/*  table  */}
      <Box className="border border-gray-300 rounded-2xl overflow-hidden">
        <Table>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={item.name + index}>
                  <TableData className="color-typography-600 font-normal text-base p-3">
                    {item.name}
                  </TableData>
                  <TableData className="text-right text-base font-bold color-typography-950 p-3">
                    {item.analyzed} {item.unit}
                  </TableData>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default IngredientsTable;
