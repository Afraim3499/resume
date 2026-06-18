# Methodology

This prototype is a purchasing power calculator using official historical price index data. It estimates how a historical local-currency amount changes over time by comparing the selected start-year price index with later years in the same country series.

The public product uses broad wording such as price index, purchasing power estimate, and inflation-adjusted value because the MVP uses different source series by country.

## Formula

For a start amount `V`, start-year index `I_start`, and target-year index `I_target`, the estimate is:

`V_target = V * (I_target / I_start)`

The calculation does not use foreign exchange rates. Amounts stay within the selected country's historical local currency system. Where a country changed domestic currency units, the calculator applies the official domestic conversion scale before applying the price-index ratio.

## United States

The United States MVP source is BLS CPI-U annual average data for all items in U.S. city average, all urban consumers, not seasonally adjusted.

## United Kingdom

The United Kingdom MVP source is the ONS long-run Retail Prices Index series. UK results should be understood as RPI-based price index estimates. The RPI source is used because it provides longer historical coverage for this prototype.

For UK years before decimalisation, the calculator still treats the input as a pound-denominated amount and adjusts purchasing power using the ONS long-run RPI. It does not model shillings or pence display.

## Canada

Canada uses Statistics Canada Table 18-10-0005-01, annual average Consumer Price Index for Canada, all-items, 2002=100.

## Netherlands

The Netherlands uses Statistics Netherlands CBS table 71905eng, Consumer prices; price index 1900=100. Years before 2002 are treated as Dutch guilder amounts and scaled to euros using the official conversion rate of EUR 1 = NLG 2.20371.

## Sweden

Sweden uses Statistics Sweden's historical CPI annual-average table. The app uses the 1900-2025 annual rows and excludes 2026 partial monthly data from start-year routes.

## France

France uses INSEE series 011813530, a 2025-base annual euro/franc price-index coefficient. Years before 2002 are treated as historical French francs. Old francs before 1960 and francs from 1960 to 2001 are scaled to euros using official domestic conversion factors.

## Australia

Australia uses Australian Bureau of Statistics Table 17 quarterly all-groups CPI for Australia. The app creates annual averages only for calendar years with all four final quarters, so Australian routes start in 1949. Years before 1966 are treated as Australian pounds and scaled to Australian dollars at A$2 per £A1.

## New Zealand

New Zealand uses Stats NZ quarterly all-groups CPI series `CPIQ.SE9A`. The app creates annual averages only for calendar years with all four final quarters, so New Zealand routes start in 1926. Years before 1967 are treated as New Zealand pounds and scaled to New Zealand dollars at NZ$2 per NZ£1.

## Denmark

Denmark uses Statistics Denmark StatBank PRIS8 annual consumer price index values, 1900=100. Amounts are treated as Danish kroner throughout the supported period.

## Belgium

Belgium uses Statbel's CPI all base years workbook. The app uses the all-items monthly CPI on the 2025 base and creates annual averages only for complete 12-month calendar years, so Belgian routes start in 1920. Years before 2002 are treated as Belgian francs and scaled to euros using EUR 1 = BEF 40.3399.

## Ireland

Ireland uses the Central Statistics Office CPA01 all-items annual Consumer Price Index series, December 2023=100. The current official open dataset pulled for launch starts in 1975 for the annual all-items row used here, so Ireland routes start in 1975. Years before 2002 are treated as Irish pounds and scaled to euros using EUR 1 = IEP 0.787564.

## Switzerland

Switzerland uses the Swiss Federal Statistical Office LIK yearly long series from the official CPI calculator app state, June 1914=100. The pulled official app state provides final annual values through 2024, so Switzerland routes currently run from 1914 to 2024.

## Norway

Norway uses Statistics Norway StatBank table 08184, historical annual Consumer Price Index values, 2015=100. Amounts are treated as Norwegian kroner throughout the supported period.

## Finland

Finland uses Statistics Finland table 11xy, the annual cost-of-living index with base period 1914:1-6=100. Public wording should describe this as official historical price index data or a cost-of-living index, not as a modern CPI-only series. Years before 2002 are treated as Finnish markka and scaled to euros using EUR 1 = FIM 5.94573.

## India

India uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1960 to 2024, and amounts are treated as Indian rupees.

## Bangladesh

Bangladesh uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1986 to 2024, and amounts are treated as Bangladeshi taka.

## Nepal

Nepal uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1964 to 2024, and amounts are treated as Nepalese rupees.

## Pakistan

Pakistan uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1960 to 2024, and amounts are treated as Pakistani rupees.

## Bhutan

Bhutan uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1980 to 2024, and amounts are treated as Bhutanese ngultrum.

## China

China uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1986 to 2024, and amounts are treated as Chinese yuan.

## Iran

Iran uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1960 to 2024. Amounts are treated as Iranian rials; toman display is not modeled.

## Iraq

Iraq uses World Bank World Development Indicators series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics. The series is an annual Consumer Price Index with base period 2010=100. Routes currently run from 1960 to 2024 where source rows exist, but 1979-1989 are missing and are not interpolated.

## Data Rules

Only years with final source data are selectable as start years. The MVP does not interpolate missing years. Missing years do not appear in selectors or generated routes.

The launch data audit was refreshed on June 18, 2026. The current launch build uses each country's latest final comparison year. Many locally sourced countries currently use 2025; Switzerland and the World Bank / IMF IFS batch currently use 2024 because that is the latest final annual value available in those pulled sources. Some sources contain 2026 monthly, quarterly, or partial rows, but those are not final annual values and are not used as indexable start-year routes in this MVP.

The UK source is cited as the ONS MM23 CDKO long-run Retail Prices Index series. The current ONS download includes a 2025 annual value for CDKO; the calculator uses that annual row while continuing to describe the source as RPI rather than CPI.

<h2 id="data-sources">Data Sources</h2>

The United States source is the BLS CPI-U all-items annual average series `CUUR0000SA0`.

The United Kingdom source is the ONS MM23 CDKO long-run Retail Prices Index series.

Canada uses Statistics Canada Table 18-10-0005-01.

The Netherlands uses CBS table 71905eng.

Sweden uses the SCB historical CPI annual-average table.

France uses INSEE BDM series 011813530.

Australia uses ABS Table 17 quarterly all-groups CPI, annualized only for complete calendar years.

New Zealand uses Stats NZ `CPIQ.SE9A`, annualized only for complete calendar years.

Denmark uses Statistics Denmark StatBank PRIS8.

Belgium uses Statbel's CPI all base years workbook, annualized from complete monthly all-items rows.

Ireland uses CSO CPA01 all-items annual CPI values from the current official open dataset.

Switzerland uses the Swiss FSO LIK yearly long-series app state.

Norway uses Statistics Norway StatBank table 08184.

Finland uses Statistics Finland table 11xy, the cost-of-living index.

India, Bangladesh, Nepal, Pakistan, Bhutan, China, Iran, and Iraq use World Bank WDI series `FP.CPI.TOTL`, sourced from IMF International Financial Statistics.

<h2 id="corrections">Corrections</h2>

If a source value, citation, route, or calculation appears wrong, the intended correction path is to verify the official source row first, then update the normalized CSV, regenerate the runtime JSON, and rerun validation before publishing the correction.

<h2 id="disclaimer">Disclaimer</h2>

This calculator is for educational context only. It is not financial, investment, legal, tax, or accounting advice.

## Limitations

This is an educational estimate, not financial advice. Price index data reflects broad consumer price baskets and may not match the cost of a specific household, city, asset, product, or service.
