import { DomainEvent } from './DomainEvent';

export interface IAggregateRoot {
  DomainEvents(): Array<DomainEvent>;

  AddDomainEvent(event: DomainEvent): void;

  RemoveDomainEvent(event: DomainEvent): void;

  ClearDomainEvents(): void;

  toPrimitives(): unknown;
}

export abstract class AggregateRoot implements IAggregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  DomainEvents = (): Array<DomainEvent> => this.domainEvents;

  AddDomainEvent = (event: DomainEvent): void => {
    this.domainEvents.push(event);
  };

  RemoveDomainEvent = (event: DomainEvent): void => {
    const index: number = this.domainEvents.indexOf(event);

    if (index === -1) return;

    this.domainEvents.splice(this.domainEvents.indexOf(event), 1);
  };

  ClearDomainEvents = () => {
    this.domainEvents = [];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract toPrimitives(): any;
}
