pass

dizionario_pezzi = {"R1": [1, 8]}


def table():
    y = 0
    numeri = 8
    while y <= 32:      # y gestisce le colonne e i gestisce ogni singola riga
        i = 1
        if y == 0 or y % 4 == 0:        # fa le righe orizzontali
            while i <= 82:
                if i == 1:
                    print("  ", end='')
                else:
                    print("_", end='')
                i += 1
        else:
            if y == 2 or (y - 2) % 4 == 0:      # fa le righe con i numeri
                while i <= 82:
                    if i == 1:
                        print(numeri, "",  end='')
                        numeri -= 1
                    else:
                        pass
                        if i == 7 and y == 2:       # controllo la casella 1
                            lista_valori = list(dizionario_pezzi.values())
                            lista_chiavi = list(dizionario_pezzi.keys())
                            cas1 = [1, 8]
                            for e in range(0, len(lista_valori), 1):  # controllo con un ciclo che nel dizionario ci
                                if cas1 == lista_valori[e]:           # sia un pezzo in posizione [UNO, UNO] e lo metto
                                    pezzo = lista_chiavi[e]
                                    if len(pezzo) > 1:
                                        pezzo = pezzo[0]
                                        print(pezzo, end='')
                                        i += 1
                        if i == 2 or (i - 2) % 10 == 0:
                            print("|", end='')
                        else:
                            print(" ", end='')
                    i += 1
            else:       # fa le righe senza numeri
                while i <= 82:
                    if i == 1:
                        print("  ", end='')
                    else:
                        if i == 2 or (i - 2) % 10 == 0:
                            print("|", end='')
                        else:
                            print(" ", end='')
                    i += 1
        print("\n", end='')
        y += 1
    i = 1
    while i < 72:       # riga di lettere
        if i == 8:
            print("A", end='')
        if i == 17:
            print("B", end='')
        if i == 26:
            print("C", end='')
        if i == 35:
            print("D", end='')
        if i == 44:
            print("E", end='')
        if i == 53:
            print("F", end='')
        if i == 62:
            print("G", end='')
        if i == 71:
            print("H", end='')
        else:
            print(" ", end='')
        i += 1
    print("\n\n")


print(table())

pass
