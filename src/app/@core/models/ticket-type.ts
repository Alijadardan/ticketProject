export class TicketType {
    static readonly VIP  = new TicketType(1, 'VIP', 50);
    static readonly MEDIUM = new TicketType(2, 'MEDIUM', 25);
    static readonly ECONOMY  = new TicketType(3, 'ECONOMY', 10);

    // private to disallow creating other instances of this type
    private constructor(private readonly id: number, public readonly type: string, public readonly price: number) {
    }

    getTicketTypes() {
      return TicketType.VIP
    }
}
