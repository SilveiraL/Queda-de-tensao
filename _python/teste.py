import sys
import qtu

args = sys.argv[1:]

queda_de_tensao_unitaria = qtu.getQTU(args[0], int(args[1]), float(args[2]));

print(queda_de_tensao_unitaria)
