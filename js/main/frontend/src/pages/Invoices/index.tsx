import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import InvoiceList from "../../components/invoice/invoice-list";
import Loader from "../../components/ui/loader/loader";
import ErrorMessage from "../../components/ui/error-message";
import { useState } from "react";
import { SortOrder } from "../../types";
import { useInvoicesQuery } from "../../data/invoice";
import Card from "../../components/common/card";
import Search from "../../components/common/search";
import { ArrowUp } from "../../components/icons/arrow-up";
import { ArrowDown } from "../../components/icons/arrow-down";
import cn from "classnames";
import InvoiceFilter from "../../components/invoice/invoice-filter";

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fgsStatus, setFgsStatus] = useState("");
  const [financeStatus, setFinanceStatus] = useState("");
  const [visible, setVisible] = useState(true);
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("createdAt");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { invoices, loading, error, paginatorInfo } = useInvoicesQuery({
    companyName: searchTerm,
    fgsStatus: fgsStatus,
    financeStatus: financeStatus,
    start_date: startDate ? startDate.toISOString() : undefined,
    end_date: endDate ? endDate.toISOString() : undefined,
    page,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading..." />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: number) {
    setPage(current);
  }

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  const onDateRangeFilter = (dates: [Date | null, Date | null]) => {
    if (dates) {
      const [start, end] = dates;

      // Increment end date by 1 day
      const incrementedEndDate = end ? new Date(end) : null;
      if (incrementedEndDate) {
        incrementedEndDate.setDate(incrementedEndDate.getDate() + 1);
      }

      setStartDate(start);
      setEndDate(incrementedEndDate);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  function toggleVisible() {
    setVisible((v) => !v);
  }

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Invoices" />
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="flex w-full flex-col items-center ms-auto md:w-2/4">
            <Search
              onSearch={handleSearch}
              placeholderText="Search by Company Name"
            />
          </div>

          <button
            className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5 dark:text-white/90"
            onClick={toggleVisible}
          >
            Filters
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>
        </div>

        <div
          className={cn("flex w-full transition", {
            "visible h-auto": visible,
            "invisible h-0": !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <InvoiceFilter
              className="w-full"
              onFGStatusFilter={(object: any) => {
                setFgsStatus(object?.value);
                setPage(1);
              }}
              onFinanceStatusFilter={(object: any) => {
                setFinanceStatus(object?.value);
                setPage(1);
              }}
              onDateRangeFilter={onDateRangeFilter}
              enableDateRange
              enableFGStatus
              enableFinanceStatus
            />
          </div>
        </div>
      </Card>
      <div className="space-y-6">
        <InvoiceList
          invoices={invoices}
          paginatorInfo={paginatorInfo}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      </div>
    </>
  );
}
