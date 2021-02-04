import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * 异步下拉框数据源
 */
export class SelectAsyncDs {
  options = [];
  pageNum = 1;
  loading = false; // 是否正在请求数据
  allDataLoaded = false; // 是否所有数据都已加载完毕
  query = '';
  pageSize = 15;
  getPaggingListFunc: (pageNum, pageSize, query) => Observable<any>;
  doSearch$ = new Subject<any>();

  constructor(getPaggingListFunc: (pageNum, pageSize, quer) => Observable<any>) {
    this.getPaggingListFunc = getPaggingListFunc;

    this.doSearch$.pipe(debounceTime(300)).subscribe((v) => {
      this.query = v || '';
      this.options = [];
      this.pageNum = 1;
      this.reload().subscribe();
    });
  }

  onSearch = (v) => {
    this.doSearch$.next(v);
  };

  reload() {
    this.loading = true;
    return this.getPaggingListFunc(this.pageNum, this.pageSize, this.query).pipe(
      map((data: any[]) => {
        this.loading = false;
        this.options = data;
        return this.options;
      }),
    );
  }

  loadMore() {
    if (this.loading) {
      // 连续触发 loadMore 时,如果上一次请求的数据还没有返回，则忽略下一次请求。
      return;
    }

    if (this.allDataLoaded) {
      // 如果所有数据都已加载完毕，不再请求新数据
      return;
    }

    this.pageNum += 1;

    this.loading = true;
    return this.getPaggingListFunc(this.pageNum, this.pageSize, this.query).subscribe((data: any[]) => {
      // 判断是否已加载了全部数据
      if (!data || data.length <= 0) {
        this.allDataLoaded = true;
      }

      this.loading = false;
      this.options = [...this.options, ...data];
    });
  }

  appendOption(dto: any, getIdFunc: (dto: any) => string) {
    this.options = [dto, ...this.options.filter((t) => getIdFunc(t) !== getIdFunc(dto))];
  }
}
