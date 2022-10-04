import {defaultSagas} from './create-sagas';
import {ForkEffect} from 'redux-saga/effects';
import {all} from 'redux-saga/effects';

export type SagaGenerator = () => Generator<ForkEffect<never>, void, unknown>;

export default function* rootSaga(tasks: SagaGenerator[]) {
  yield all(tasks.map((task) => task()));
}

export class SagaManager {
  private static instance: SagaManager;
  private sagas: {[a: string]: SagaGenerator};
  private runSaga?: Function;
  private runningSaga: {cancel: () => {}};

  public static getInstance(runner?: Function): SagaManager {
    if (!SagaManager.instance) SagaManager.instance = new SagaManager(runner);

    return SagaManager.instance;
  }

  constructor(runner?: Function) {
    this.sagas = defaultSagas();
    this.runSaga = runner;

    this.updateRuntime();
  }

  public updateRuntime() {
    const allTaks: SagaGenerator[] = [];

    for (const key in this.sagas) {
      allTaks.push(this.sagas[key]);
    }

    if (this.runningSaga) this.runningSaga.cancel();

    this.runningSaga = this.runSaga(rootSaga.bind({}, allTaks));
  }

  public removeSaga = (key: string) => {
    if (this.sagas[key]) {
      delete this.sagas[key];

      this.updateRuntime();
    }
  };

  public injectSaga(key: string, asyncSaga: SagaGenerator) {
    if (!this.sagas[key]) {
      this.sagas[key] = asyncSaga;

      this.updateRuntime();
    }
  }
}
